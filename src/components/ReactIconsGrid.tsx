import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface ReactIconsGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tablerIcons: any;
  paginatedIcons: string[];
  handleCopy: (iconName: string) => void;
}

const ReactIconsGrid: FC<ReactIconsGridProps> = ({
  tablerIcons,
  paginatedIcons,
  handleCopy,
}) => {
  return (
    <Stack
      gap={2}
      direction='row'
      justifyContent='center'
      alignItems='center'
      flexWrap='wrap'
      width='100%'>
      {paginatedIcons.map((iconName) => {
        const Icon = tablerIcons[
          iconName as keyof typeof tablerIcons
        ] as React.ElementType;
        if (typeof Icon === 'function') return null;
        return (
          <Stack
            alignItems='center'
            justifyContent='center'
            key={iconName}
            gap={1}
            flexGrow={1}
            maxWidth={'300px'}
            width={'150px'}
            onClick={() => handleCopy(iconName)}
            sx={{
              cursor: 'pointer',
              boxShadow: 1,
              borderRadius: 1,
              padding: 2,
              bgcolor: 'background.paper',
              transition: 'all 0.1s',
              '&:hover': {
                bgcolor: 'background.default',
                boxShadow: 4,
              },
            }}>
            <Icon key={iconName} size={40} />
            <Typography
              variant='caption'
              sx={{ textAlign: 'center' }}
              fontSize={12}
              noWrap>
              {iconName}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default ReactIconsGrid;
