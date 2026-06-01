import { useState, useCallback, type FormEvent } from 'react';

interface FormState {
  customerName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: number;
  details: string;
}

interface FieldErrors {
  name: boolean;
  email: boolean;
  project: boolean;
}

interface FieldValid {
  name: boolean;
  email: boolean;
  project: boolean;
}

/**
 * Form handling hook replacing form.js.
 * Manages validation, budget slider display, and Formspree submission.
 */
export function useForm() {
  const [formState, setFormState] = useState<FormState>({
    customerName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: 15000,
    details: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({
    name: false,
    email: false,
    project: false,
  });

  const [valid, setValid] = useState<FieldValid>({
    name: false,
    email: false,
    project: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const budgetDisplay = '₹' + formState.budget.toLocaleString('en-IN');

  const updateField = useCallback(
    (field: keyof FormState, value: string | number) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validateField = useCallback(
    (name: 'name' | 'email' | 'project'): boolean => {
      let isValid = true;

      switch (name) {
        case 'name':
          isValid = formState.customerName.trim().length >= 2;
          break;
        case 'email': {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailRegex.test(formState.email.trim());
          break;
        }
        case 'project':
          isValid = formState.projectType !== '';
          break;
      }

      setErrors((prev) => ({ ...prev, [name]: !isValid }));
      setValid((prev) => ({ ...prev, [name]: isValid }));
      return isValid;
    },
    [formState.customerName, formState.email, formState.projectType]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const nameValid = validateField('name');
      const emailValid = validateField('email');
      const projectValid = validateField('project');

      if (!nameValid || !emailValid || !projectValid) {
        return;
      }

      setSubmitting(true);

      try {
        const formData = new FormData();
        formData.append('customer_name', formState.customerName);
        formData.append('email', formState.email);
        formData.append('phone', formState.phone);
        formData.append('project_type', formState.projectType);
        formData.append('budget', formState.budget.toString());
        formData.append('details', formState.details);

        const response = await fetch('https://formspree.io/f/xaqvrewo', {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          setMessage({
            type: 'success',
            text: "🍕 Order received! I'll start preheating your project and get back to you within 24 hours.",
          });
          setFormState({
            customerName: '',
            email: '',
            phone: '',
            projectType: '',
            budget: 15000,
            details: '',
          });
          setErrors({ name: false, email: false, project: false });
          setValid({ name: false, email: false, project: false });
        } else {
          throw new Error('Server error');
        }
      } catch {
        setMessage({
          type: 'error',
          text: '⚠️ Something went wrong. Please email me directly at pizzzascript@gmail.com',
        });
      }

      setSubmitting(false);
      setTimeout(() => setMessage(null), 6000);
    },
    [formState, validateField]
  );

  return {
    formState,
    errors,
    valid,
    submitting,
    message,
    budgetDisplay,
    updateField,
    validateField,
    handleSubmit,
  };
}
