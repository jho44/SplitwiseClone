export type TabId = "friends" | "groups" | "activity" | "account";

export type Recipient = {
  label: string;
  email: string;
};

export type PaidDetails = {
  [key: string]: number;
};

export type OwedAmts = {
  [key: string]: number | null;
};

export type OwedDetails = {
  type: "equal" | "exact" | "percent";
  amts: OwedAmts;
};
