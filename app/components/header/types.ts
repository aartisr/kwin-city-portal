export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  desc?: string;
};

export type NavGroup = {
  key: string;
  label: string;
  items: NavItem[];
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};
