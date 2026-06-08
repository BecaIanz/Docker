import { Card, CardContent, Typography, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';

interface CardCompanyProps {
  id: number;
  name: string;
}

export const CardCompany = ({ id, name }: CardCompanyProps) => {
  return (
    <Card 
      className="w-full h-full flex flex-col border border-(--stroke) rounded-2xl shadow-(--shadow) hover:shadow-md transition-all"
    >
      <CardContent className="flex flex-col items-center gap-3 p-4">
        <div className="p-3 bg-(--lightGray) rounded-full">
          <BusinessIcon fontSize="large" sx={{ color: 'var(--blue)' }} />
        </div>
        <Typography variant="h6" className="text-(--text) font-bold text-center">
          {name}
        </Typography>
        <Typography variant="body2" className="text-(--gray) text-center">
          ID: {id}
        </Typography>
      </CardContent>
    </Card>
  );
};