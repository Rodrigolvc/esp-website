import { Box, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../components/UI';
import { MERGE_DATA_CHALLENGE_EMAIL_ADDRESS, MERGE_DATA_CHALLENGE_PREVIEW_URL } from '../../constants';

const MergeDataChallengeApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Merge data challenge'
        description='Calling all Ethereans, data scientists, data engineers, data visualizers, developers, and anyone interested in digging into Ethereum data!'
        image={MERGE_DATA_CHALLENGE_PREVIEW_URL}
      />

      <Box
        position='relative'
        py={{ md: 12 }}
        px={{ sm: 5, md: 24, lg: 32, xl: 72 }}
        pb={5}
        mt={{ base: 24, md: 6 }}
      >
        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Submit to the Merge Data Challenge
            </PageSubheading>

            <PageText textAlign='center'>
              If you have any questions before submitting your blog post, you may contact us at{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={`mailto:${MERGE_DATA_CHALLENGE_EMAIL_ADDRESS}`}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                {MERGE_DATA_CHALLENGE_EMAIL_ADDRESS}
              </Link>
              .
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default MergeDataChallengeApply;