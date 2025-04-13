import {
  Autocomplete,
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  ListItem,
  ListItemText,
  Pagination,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconBrandGithub, IconCheck, IconX } from '@tabler/icons-react';
import { useDebounce } from '@uidotdev/usehooks';
import Fuse, { FuseResult } from 'fuse.js';
import React, { useMemo, useState } from 'react';
import IconGrid from './components/IconGrid';
import { getActiveLibraryIcons } from './utils/functions';

const ITEMS_PER_PAGE = 25;

const libOptions = [
  {
    name: '@tabler/icons',
    label: 'Tabler Icons',
    version: '1.119.0',
  },
  {
    name: '@tabler/icons-react',
    label: 'Tabler Icons React',
    version: '2.14.0',
  },
  {
    name: '@tabler/icons-react-alias',
    label: 'Tabler Icons React',
    version: '3.31.0',
  },
];

function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [activeLibrary, setActiveLibrary] = useState(libOptions[0]);

  const debouncedSearchTerm = useDebounce(search, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCopy = (iconName: string) => {
    setOpenSnack(false);
    setSnackMessage(`Copied: ${iconName}`);
    setOpenSnack(true);
    navigator.clipboard.writeText(iconName);
    setTimeout(() => {
      setOpenSnack(false);
      setSnackMessage('');
    }, 1000);
  };

  const handleClose = () => {
    setOpenSnack(false);
    setSnackMessage('');
  };

  const tablerIcons = getActiveLibraryIcons(activeLibrary);
  const TablerIcons = Object.keys(tablerIcons);

  const fuse = useMemo(() => {
    return new Fuse(TablerIcons, {
      includeScore: true,
      threshold: 0.25,
      keys: ['name'],
    });
  }, [TablerIcons]);

  const results = (
    debouncedSearchTerm
      ? fuse.search(debouncedSearchTerm)
      : TablerIcons.map((name, i) => ({ item: name, refIndex: i }))
  ) satisfies FuseResult<string>[];

  const iconCount = results.length;

  const paginatedIcons = results
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    .filter(({ item }) => item.startsWith('Icon'));

  return (
    <Container
      maxWidth='md'
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant='h4'>Tabler Icons</Typography>
      {
        <Typography variant='body1' sx={{ textAlign: 'center' }}>
          {`Total ${iconCount} icons`}
        </Typography>
      }
      {tablerIcons && (
        <Typography variant='caption' sx={{ textAlign: 'center' }}>
          {`Version: ${activeLibrary.version}`}
        </Typography>
      )}
      <Grid container columns={12} mt={4} columnSpacing={2}>
        <Grid item xs={12} md={4} mb={2}>
          <Autocomplete
            options={libOptions}
            size='small'
            value={activeLibrary}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => {
              return (
                <ListItem {...props} key={option.name} disablePadding>
                  <ListItemText
                    primary={option.label}
                    secondary={option.version}
                  />
                </ListItem>
              );
            }}
            onChange={(_, value) => {
              if (!value) return;
              setPage(1);
              setActiveLibrary(value);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  name='library'
                  label='Library'
                  variant='outlined'
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            size='small'
            variant='outlined'
            fullWidth
            label='Search...'
            value={search}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <Tooltip title='Clear'>
                    <IconButton
                      onClick={() => {
                        setSearch('');
                        setPage(1);
                      }}
                      size='small'>
                      <IconX size={22} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} my={2}>
          {iconCount > 0 ? (
            <Stack
              gap={2}
              direction='row'
              justifyContent='center'
              alignItems='center'
              flexWrap='wrap'
              width='100%'>
              <IconGrid
                searchTerm={debouncedSearchTerm}
                paginatedIcons={paginatedIcons}
                handleCopy={handleCopy}
                tablerIcons={tablerIcons}
              />
            </Stack>
          ) : (
            <Typography
              variant='h4'
              sx={{ textAlign: 'center', width: '100%' }}
              mt={2}
              fontSize={18}>
              No icons found for "{debouncedSearchTerm}"
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} mt={2}>
          {paginatedIcons.length > 0 && (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Pagination
                color='primary'
                size='large'
                page={page}
                count={Math.ceil(iconCount / ITEMS_PER_PAGE)}
                variant='outlined'
                shape='rounded'
                onChange={(_, value) => setPage(value)}
                siblingCount={2}
                boundaryCount={3}
              />
            </Box>
          )}
        </Grid>
      </Grid>

      <Box
        sx={{
          width: 500,
        }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnack}
          onClose={handleClose}
          message={
            snackMessage && (
              <Stack
                direction='row'
                gap={2}
                alignItems='center'
                justifyContent='center'>
                <IconCheck size={24} />
                <Typography>{snackMessage}</Typography>
              </Stack>
            )
          }
        />
      </Box>
      <Link
        href='https://github.com/C1nemaclub/tabler-icons'
        target='_blank'
        rel='noopener noreferrer'
        color='inherit'>
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 30,
          }}>
          <IconBrandGithub size={40} />
        </IconButton>
      </Link>
    </Container>
  );
}

export default App;
