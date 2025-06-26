
"use client";

import { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import 'react-image-crop/dist/ReactCrop.css';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

interface ImageCropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  onCropComplete: (croppedImageDataUrl: string) => void;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
    return centerCrop(
        makeAspectCrop({ unit: '%', width: 90 }, mediaWidth / mediaHeight, mediaWidth, mediaHeight),
        mediaWidth,
        mediaHeight
    );
}

export function ImageCropDialog({ isOpen, onClose, imageSrc, onCropComplete }: ImageCropDialogProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  }

  const handleCrop = () => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        
        canvas.width = Math.floor(completedCrop.width * scaleX);
        canvas.height = Math.floor(completedCrop.height * scaleY);
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            toast({
                title: 'Error',
                description: 'Could not process the image. Please try again.',
                variant: 'destructive',
            });
            return;
        }

        ctx.drawImage(
            imgRef.current,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );
        const base64Image = canvas.toDataURL('image/png');
        onCropComplete(base64Image);
        onClose();
    } else {
        toast({
            title: 'No Crop Area',
            description: 'Please select an area on the image to crop.',
            variant: 'destructive',
        });
    }
  };

  if (!imageSrc) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-sm sm:max-w-lg md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>
            Select the area of the image that contains the topics you want to extract.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center my-4 overflow-auto">
             <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={undefined} // Free crop, no fixed aspect ratio
             >
                <img
                    ref={imgRef}
                    alt="Crop preview"
                    src={imageSrc}
                    onLoad={onImageLoad}
                    className="ReactCrop__image" // CSS for this is in globals.css
                />
            </ReactCrop>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleCrop}>
            <Check className="mr-2 h-4 w-4" />
            Crop & Extract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
