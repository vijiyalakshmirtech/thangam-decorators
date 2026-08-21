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
  icon = <Sparkles className="w-8 h-8 text-thangam-gold-400" />,
}) => {
  return (
    <div className="p-8 sm:p-12 text-center rounded-xl bg-thangam-dark-900/60 border border-thangam-gold-500/15 max-w-lg mx-auto">
      <div className="w-14 h-14 rounded-full bg-thangam-gold-500/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-semibold text-thangam-ivory-50 mb-2">
        {title}
      </h3>
      <p className="text-sm text-thangam-ivory-100/70 max-w-sm mx-auto mb-6">
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
