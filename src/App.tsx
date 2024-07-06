import * as icons from '@tabler/icons';
import {
  Container,
  Stack,
  TextField,
  Typography,
  Grid,
  Tooltip,
  Box,
} from '@mui/material';
import './App.css';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useState } from 'react';
import { FixedSizeGrid } from 'react-window';

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const iconName = data.icons[rowIndex];
  const Icon = icons[iconName];
  return (
    <Stack
      style={style}
      alignItems='center'
      justifyContent='center'
      onClick={() => data.onClick(iconName)}
      gap={1}
      sx={{
        cursor: 'pointer',
        boxShadow: 1,
        borderRadius: 1,
        padding: 2,
        bgcolor: 'background.paper',
      }}>
      <Tooltip
        title='Click to copy'
        placement='top'
        arrow
        key={iconName}
        enterDelay={200}
        leaveDelay={200}>
        <Box>
          <Icon size={40} />
        </Box>
      </Tooltip>
      <Typography
        variant='caption'
        sx={{ textAlign: 'center' }}
        fontSize={12}
        noWrap>
        {iconName}
      </Typography>
    </Stack>
  );
};

function App() {
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCopy = (iconName: string) => {
    console.log(iconName);
  };

  const allIcons = Object.keys(icons);
  const filteredIcons = allIcons.filter((iconName) => {
    return iconName.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
  });
  const iconCount = filteredIcons.length;

  const gridData = {
    icons: filteredIcons,
    onClick: handleCopy,
  };

  return (
    <>
      <Container
        maxWidth='md'
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography variant='h4'>Tabler Icons</Typography>

        <Grid container columns={12} mt={4}>
          <Grid item xs={12}>
            <TextField
              size='small'
              variant='outlined'
              fullWidth
              label='Search...'
              value={search}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} mt={4}>
            <FixedSizeGrid
              columnCount={4}
              columnWidth={200}
              height={650}
              rowCount={iconCount / 4}
              rowHeight={120}
              width={850}
              // itemData={filteredIcons}
              itemData={gridData}>
              {Cell}
            </FixedSizeGrid>
            {/* <Stack
              gap={2}
              direction='row'
              justifyContent='center'
              alignItems='center'
              flexWrap='wrap'>
              {filteredIcons.map((iconName) => {
                const Icon = icons[iconName];
                return (
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    key={iconName}
                    gap={1}
                    width={'150px'}
                    onClick={() => handleCopy(iconName)}
                    sx={{
                      cursor: 'pointer',
                      boxShadow: 1,
                      borderRadius: 1,
                      padding: 2,
                      bgcolor: 'background.paper',
                    }}>
                    <Icon size={40} />
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
            </Stack> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
