import { Stack, Typography } from '@mui/material';
import { FuseResult } from 'fuse.js';
import React, { FC } from 'react';
import { extractTermParts } from '../utils/functions';

interface IconGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tablerIcons: any;
  paginatedIcons: FuseResult<string>[];
  handleCopy: (iconName: string) => void;
  searchTerm: string;
}

const IconGrid: FC<IconGridProps> = ({
  tablerIcons,
  paginatedIcons,
  handleCopy,
  searchTerm,
}) => {
  return (
    <Stack
      gap={2}
      direction='row'
      justifyContent='center'
      alignItems='center'
      flexWrap='wrap'
      width='100%'>
      {paginatedIcons.map(({ item: iconName }) => {
        const Icon = tablerIcons[
          iconName as keyof typeof tablerIcons
        ] as React.ElementType;
        const match = extractTermParts(searchTerm, iconName);
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
            {match ? (
              <Stack direction='row'>
                <Typography
                  variant='caption'
                  sx={{ textAlign: 'center', display: 'inline' }}
                  fontSize={12}
                  noWrap>
                  {match?.before}
                </Typography>
                <Typography
                  variant='caption'
                  fontSize={12}
                  noWrap
                  sx={{
                    textAlign: 'center',
                    display: 'inline',
                    color: ({ palette }) => palette.common.white,
                    backgroundColor: ({ palette }) => palette.primary.main,
                  }}>
                  {match?.searchTerm}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ textAlign: 'center', display: 'inline' }}
                  fontSize={12}
                  noWrap>
                  {match?.after}
                </Typography>
              </Stack>
            ) : (
              <Typography
                variant='caption'
                sx={{ textAlign: 'center', display: 'inline' }}
                fontSize={12}
                noWrap>
                {iconName}
              </Typography>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default IconGrid;
