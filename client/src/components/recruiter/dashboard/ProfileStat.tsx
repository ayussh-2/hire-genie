interface ProfileStatProps {
  label: string;
  value: string | number;
}

export const ProfileStat = ({ label, value }: ProfileStatProps) => (
  <div className="text-center p-3 rounded-lg bg-primary/5">
    <div className="font-semibold">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);