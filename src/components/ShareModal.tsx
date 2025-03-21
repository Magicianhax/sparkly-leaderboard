
import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShareCard } from '@/components/ShareCard';
import { Download, Share } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sparks: number;
  address: string;
  rank?: number;
}

export const ShareModal = ({ open, onOpenChange, sparks, address, rank }: ShareModalProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current);
      
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const newTab = window.open();
        if (newTab) {
          newTab.document.write(`<img src="${dataUrl}" alt="Firewall Sparks"/>`);
          toast({
            title: "Image ready!",
            description: "Long press the image to save",
          });
        } else {
          throw new Error("Popup blocked");
        }
      } else {
        const link = document.createElement('a');
        link.download = 'firewall-sparks.png';
        link.href = dataUrl;
        link.click();
        
        toast({
          title: "Success!",
          description: "Card downloaded successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to download card",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    const rankText = rank ? `#${rank}` : '';
    const leaderboardUrl = 'https://firewall-sparks-leaderboard.lovable.app/';
    const tweetText = `🔥 JUST BROKE ${rankText} IN @UseFirewall GENESIS! 🔥\n\nSitting on a massive ${sparks.toLocaleString()} Sparks and climbing! 📈\nThe grind is paying off BIG TIME. 🚀\n\nCheck your own Sparks balance on the dashboard built by @magicianafk\n${leaderboardUrl}\n\n#FirewallGenesis`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-[350px]' : 'max-w-[650px]'} bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/10 dark:to-background`}>
        <DialogHeader>
          <DialogTitle className="text-yellow-900 dark:text-yellow-100">Share Your Sparks 🔥</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center">
            <ShareCard ref={cardRef} sparks={sparks} address={address} rank={rank} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              onClick={handleDownload} 
              className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-semibold"
            >
              <Download className="mr-2 h-4 w-4" />
              {/iPad|iPhone|iPod/.test(navigator.userAgent) ? 'View Image' : 'Download Card'}
            </Button>
            <Button 
              onClick={handleShare} 
              className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-semibold"
            >
              <Share className="mr-2 h-4 w-4" />
              Share on Twitter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
