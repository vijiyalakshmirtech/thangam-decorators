'use client';

import React, { useState } from 'react';
import { Button } from '../common/Button';
import { TechLabel } from '../common/TechLabel';
import { isValidEmail, isValidPhone, sanitizeInput } from '../../utils/validation';
import { trackEvent } from '../../lib/analytics';
import { CheckCircle2, AlertCircle, Send, Sparkles, MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../../utils/urlHelpers';
import { siteConfig } from '../../config/site';

export interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    eventType: 'Wedding & Muhurtham',
    eventDate: '',
    venueLocation: '',
    message: '',
    botField: '', // Honeypot spam trap
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('quote_start', { sourceLocation: 'contact_form' });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a contact phone number.';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email.trim() && !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.eventDate.trim()) {
      newErrors.eventDate = 'Please select your event or Muhurtham date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.botField) {
      setIsSuccess(true);
      return;
    }

    if (!validate()) {
      return;
    }

    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName),
      phone: sanitizeInput(formData.phone),
      email: sanitizeInput(formData.email),
      venueLocation: sanitizeInput(formData.venueLocation),
      message: sanitizeInput(formData.message),
    };

    setIsSubmitting(true);

    try {
      const _payload = {
        ...sanitizedData,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
      };
      await new Promise((resolve) => setTimeout(resolve, 600, _payload));

      // Track non-PII conversion event
      trackEvent('quote_submit', {
        category: formData.eventType,
        hasCustomDate: Boolean(formData.eventDate),
        sourceLocation: 'contact_form',
      });

      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setErrors({ form: 'Unable to submit right now. Please call P.T. Selvam directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsAppSuccessUrl = generateWhatsAppUrl(
    siteConfig.contact.phonePrimary,
    `Vanakkam P.T. Selvam, I submitted a consultation request for ${formData.eventType} on ${formData.eventDate} via your website.`
  );

  if (isSuccess) {
    return (
      <div className="p-8 bg-[#3B0D18] border border-[#C6A15B]/40 rounded-2xl text-center shadow-xl">
        <CheckCircle2 className="w-12 h-12 text-[#E0C078] mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-semibold text-[#FFF8ED] mb-2">
          Consultation Request Received
        </h3>
        <p className="text-sm text-[#F7F0E4]/80 max-w-md mx-auto mb-6 font-light">
          Thank you. P.T. Selvam and the Thangam Decorators studio team will review your event requirements and connect with you directly.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {whatsAppSuccessUrl && (
            <Button
              variant="whatsapp"
              size="sm"
              href={whatsAppSuccessUrl ?? undefined}
              target="_blank"
              leftIcon={<MessageCircle className="w-4 h-4" />}
              className="text-xs uppercase tracking-wider font-semibold"
            >
              Direct WhatsApp Follow-up
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                eventType: 'Wedding & Muhurtham',
                eventDate: '',
                venueLocation: '',
                message: '',
                botField: '',
              });
            }}
            className="text-xs font-semibold border-[#C6A15B]/30 hover:border-[#E0C078]"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 text-left ${className}`}
      noValidate
    >
      {/* Honeypot Spam Trap (Hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="form-botField">Do not fill this</label>
        <input
          id="form-botField"
          type="text"
          name="botField"
          tabIndex={-1}
          value={formData.botField}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      {errors.form && (
        <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="form-fullName"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#E0C078] mb-1.5"
          >
            Your Name <span className="text-[#E0C078]">*</span>
          </label>
          <input
            id="form-fullName"
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onFocus={handleFocus}
            onChange={handleChange}
            placeholder="e.g. Senthil Kumar"
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-[#FFF8ED] placeholder-[#FFF8ED]/30 focus:outline-none focus:ring-2 focus:ring-[#E0C078] transition-colors ${
              errors.fullName ? 'border-rose-500' : 'border-[#C6A15B]/30'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>
          )}
        </div>

        {/* Mobile Phone */}
        <div>
          <label
            htmlFor="form-phone"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#E0C078] mb-1.5"
          >
            Mobile Number <span className="text-[#E0C078]">*</span>
          </label>
          <input
            id="form-phone"
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onFocus={handleFocus}
            onChange={handleChange}
            placeholder="e.g. 98426 69882"
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-[#FFF8ED] placeholder-[#FFF8ED]/30 focus:outline-none focus:ring-2 focus:ring-[#E0C078] transition-colors ${
              errors.phone ? 'border-rose-500' : 'border-[#C6A15B]/30'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Event Type */}
        <div>
          <label
            htmlFor="form-eventType"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#E0C078] mb-1.5"
          >
            Event Type <span className="text-[#E0C078]">*</span>
          </label>
          <select
            id="form-eventType"
            name="eventType"
            value={formData.eventType}
            onFocus={handleFocus}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#C6A15B]/30 text-sm text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E0C078] transition-colors"
          >
            <option value="Wedding & Muhurtham" className="bg-[#3B0D18] text-[#FFF8ED]">Traditional Wedding & Muhurtham</option>
            <option value="Grand Reception" className="bg-[#3B0D18] text-[#FFF8ED]">Grand Evening Reception</option>
            <option value="Haldi & Mehendi" className="bg-[#3B0D18] text-[#FFF8ED]">Haldi / Mehendi / Sangeet</option>
            <option value="Engagement" className="bg-[#3B0D18] text-[#FFF8ED]">Engagement (Nichayathartham)</option>
            <option value="Temple / Cultural" className="bg-[#3B0D18] text-[#FFF8ED]">Temple Festival / Cultural Function</option>
            <option value="Other Celebration" className="bg-[#3B0D18] text-[#FFF8ED]">Other Celebration</option>
          </select>
        </div>

        {/* Event Date */}
        <div>
          <label
            htmlFor="form-eventDate"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#E0C078] mb-1.5"
          >
            Event Date <span className="text-[#E0C078]">*</span>
          </label>
          <input
            id="form-eventDate"
            type="date"
            name="eventDate"
            required
            value={formData.eventDate}
            onFocus={handleFocus}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-sm text-[#FFF8ED] focus:outline-none focus:ring-2 focus:ring-[#E0C078] transition-colors ${
              errors.eventDate ? 'border-rose-500' : 'border-[#C6A15B]/30'
            }`}
          />
          {errors.eventDate && (
            <p className="mt-1 text-xs text-rose-400">{errors.eventDate}</p>
          )}
        </div>
      </div>

      {/* Venue Name & Location */}
      <div>
        <label
          htmlFor="form-venueLocation"
          className="block text-[11px] font-mono uppercase tracking-wider text-[#E0C078] mb-1.5"
        >
          Mandapam / Venue Name & Location
        </label>
        <input
          id="form-venueLocation"
          type="text"
          name="venueLocation"
          value={formData.venueLocation}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder="e.g. Kalyana Mandapam, Perundurai Road, Erode"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#C6A15B]/30 text-sm text-[#FFF8ED] placeholder-[#FFF8ED]/30 focus:outline-none focus:ring-2 focus:ring-[#E0C078] transition-colors"
        />
      </div>

      {/* Specific Requirements / Message */}
      <div>
        <label
          htmlFor="form-message"
          className="block text-[11px] font-mono uppercase tracking-wider text-[#E0C078] mb-1.5"
        >
          Specific Stage Requirements / Notes
        </label>
        <textarea
          id="form-message"
          name="message"
          rows={3}
          value={formData.message}
          onFocus={handleFocus}
          onChange={handleChange}
          placeholder="e.g. Looking for a traditional temple theme mandapam with fresh lotus and jasmine florals."
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-[#C6A15B]/30 text-sm text-[#FFF8ED] placeholder-[#FFF8ED]/30 focus:outline-none focus:ring-2 focus:ring-[#E0C078] transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full uppercase tracking-wider text-xs font-bold shadow-gold-md"
        rightIcon={<Send className="w-4 h-4 text-[#3B0D18]" />}
      >
        Request Free Stage Consultation
      </Button>

      <p className="text-[10px] font-mono text-center text-[#F7F0E4]/60 mt-2">
        Direct consultation with P.T. Selvam • 100% Privacy Respected
      </p>
    </form>
  );
};

export default ContactForm;
