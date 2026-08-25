import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  onAction,
  icon = <Sparkles className="w-8 h-8 text-[#6E1830]" />,
}) => {
  return (
    <div className="p-8 sm:p-12 text-center rounded-2xl bg-[#FFF8ED] border border-[#6E1830]/20 max-w-lg mx-auto shadow-md">
      <div className="w-14 h-14 rounded-full bg-[#6E1830]/10 border border-[#6E1830]/20 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-bold text-[#6E1830] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#1F161A]/75 max-w-sm mx-auto mb-6 font-light">
        {description}
      </p>
      {actionText && (actionHref || onAction) && (
        <Button
          variant="secondary"
          size="sm"
          href={actionHref}
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};
