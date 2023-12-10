export type TabId = "friends" | "groups" | "activity" | "account";

export type Recipient = {
  label: string;
  email: string;
};

export type PaidDetails = {
  [key: string]: number;
};
