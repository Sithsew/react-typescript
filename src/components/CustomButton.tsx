import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <div style={{ margin: "10px 0" }}>
      <Button
        {...props}
        sx={{
          backgroundColor: '#FE956F',
          height: '50px',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FFA270',
          },
        }}
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomButton;
