import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CustomerDetailScreenProps } from '@/navigation/types';
import {
  formatCardNumber,
  maskCardNumber,
} from '@/utils/creditCard';

export interface DetailRow {
  label: string;
  value?: string | number;
}

export interface DetailSection {
  title: string;
  rows: DetailRow[];
}

export interface BankCardData {
  cardType: string;
  cardNumber: string;
  cardExpire: string;
  currency: string;
}

export function useCustomerDetailScreen({ route }: CustomerDetailScreenProps) {
  const { user } = route.params;
  const { t } = useTranslation('detail');

  const [cardRevealed, setCardRevealed] = useState(false);
  const toggleCard = useCallback(() => setCardRevealed((prev) => !prev), []);

  const bankCard = useMemo<BankCardData | null>(() => {
    if (!user.bank) return null;
    const cardNum = user.bank.cardNumber;
    const iban = user.bank.iban;

    return {
      cardType: user.bank.cardType ?? '',
      cardNumber: cardNum
        ? cardRevealed
          ? formatCardNumber(cardNum)
          : maskCardNumber(cardNum)
        : '',
      cardExpire: user.bank.cardExpire ?? '',
      currency: user.bank.currency ?? '',
    };
  }, [user.bank, cardRevealed]);

  const sections = useMemo<DetailSection[]>(() => {
    const placeholder = t('notProvided');
    const v = (val?: string | number) =>
      val === undefined || val === null || val === '' ? placeholder : val;

    return [
      {
        title: t('sections.contact'),
        rows: [
          { label: t('fields.email'), value: v(user.email) },
          { label: t('fields.phone'), value: v(user.phone) },
          { label: t('fields.username'), value: v(user.username) },
        ],
      },
      {
        title: t('sections.personal'),
        rows: [
          { label: t('fields.age'), value: v(user.age) },
          { label: t('fields.gender'), value: v(user.gender) },
          { label: t('fields.birthDate'), value: v(user.birthDate) },
          { label: t('fields.bloodGroup'), value: v(user.bloodGroup) },
          { label: t('fields.university'), value: v(user.university) },
        ],
      },
      {
        title: t('sections.address'),
        rows: [
          { label: t('fields.address'), value: v(user.address?.address) },
          { label: t('fields.city'), value: v(user.address?.city) },
          { label: t('fields.state'), value: v(user.address?.state) },
          {
            label: t('fields.postalCode'),
            value: v(user.address?.postalCode),
          },
          { label: t('fields.country'), value: v(user.address?.country) },
        ],
      },
      {
        title: t('sections.company'),
        rows: [
          {
            label: t('fields.companyName'),
            value: v(user.company?.name),
          },
          {
            label: t('fields.department'),
            value: v(user.company?.department),
          },
          {
            label: t('fields.jobTitle'),
            value: v(user.company?.title),
          },
        ],
      },
    ];
  }, [t, user]);

  return {
    user,
    t,
    sections,
    bankCard,
    cardRevealed,
    toggleCard,
  };
}
