import styled from 'styled-components';
import { Card as CardAntd } from 'antd';
import { ReactNode } from 'react';

const CustomCard = styled(CardAntd)`
    padding: 0px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

type CardProps = {
    children: ReactNode;
    title?: ReactNode;
    className?: string;
};

export const Card = ({ children, title, className }: CardProps) => {
    return (
        <CustomCard title={title} className={className}>
            {children}
        </CustomCard>
    );
};
