import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/locales';

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

export type DeepPartial<T> =
  T extends Primitive
    ? T
    : T extends Array<infer Item>
    ? Array<DeepPartial<Item>>
    : { [Key in keyof T]?: DeepPartial<T[Key]> };

export type LocalizedValue<T> = Record<typeof DEFAULT_LOCALE, T> & Partial<Record<Locale, T>>;
