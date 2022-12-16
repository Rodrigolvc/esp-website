// Libraries
import {
  Box,
  Center,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

// API
import { api } from './api';

// Components
import { SubmitButton } from '../SubmitButton';
import { Captcha } from '.';
import { DropdownIndicator, PageText } from '../UI';

// Constants
import {
  COUNTRY_OPTIONS,
  HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE,
  OTHER,
  SEMAPHORE_APPLYING_AS_OPTIONS,
  SEMAPHORE_GRANT_PROJECT_CATEGORY_OPTIONS,
  TIMEZONE_OPTIONS,
  WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS
} from './constants';
import { SEMAPHORE_GRANT_THANK_YOU_PAGE_URL, TOAST_OPTIONS } from '../../constants';

// Styles
import { chakraStyles } from './selectStyles';

// Types
import { ApplyingAs, GrantsReferralSource, SemaphoreGrantFormData } from '../../types';

export const SemaphoreGrantForm: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const [grantsReferralSource, setGrantsReferralSource] = useState<GrantsReferralSource | unknown>({
    value: '',
    label: ''
  });
  const [applyingAs, setApplyingAs] = useState<ApplyingAs | unknown>({
    value: '',
    label: ''
  });

  const methods = useForm<SemaphoreGrantFormData>({
    mode: 'onBlur'
  });
  const {
    handleSubmit,
    register,
    trigger,
    control,
    formState: { errors, isValid, isSubmitting },
    reset
  } = methods;

  const onSubmit = async (data: SemaphoreGrantFormData) => {
    return api.semaphoreGrant
      .submit(data)
      .then(res => {
        if (res.ok) {
          reset();
          router.push(SEMAPHORE_GRANT_THANK_YOU_PAGE_URL);
        } else {
          toast({
            ...TOAST_OPTIONS,
            title: 'Something went wrong while submitting, please try again.',
            status: 'error'
          });
          throw new Error('Network response was not OK');
        }
      })
      .catch(err => console.error('There has been a problem with your operation: ', err.message));
  };

  const handleApplyingAs = (value: ApplyingAs) => {
    setApplyingAs(value);
  };

  const handleGrantsReferralSource = (source: GrantsReferralSource) => {
    setGrantsReferralSource(source);
  };

  return (
    <Stack
      w='100%'
      bgGradient='linear(to-br, brand.newsletter.bgGradient.start 10%, brand.newsletter.bgGradient.end 100%)'
      px={{ base: 5, md: 12 }}
      pt={{ base: 8, md: 12 }}
      pb={{ base: 20, md: 16 }}
      borderRadius={{ md: '10px' }}
    >
      <FormProvider {...methods}>
        <form id='project-grants-form' onSubmit={handleSubmit(onSubmit)}>
          <Flex direction='column' mb={8}>
            <Flex direction={{ base: 'column', md: 'row' }} mb={3}>
              <FormControl
                id='first-name-control'
                isRequired
                mr={{ md: 12 }}
                mb={{ base: 8, md: 0 }}
              >
                <FormLabel htmlFor='firstName'>
                  <PageText display='inline' fontSize='input'>
                    First name
                  </PageText>
                </FormLabel>

                <Input
                  id='firstName'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  {...register('firstName', {
                    required: true,
                    maxLength: 40
                  })}
                />

                {errors?.firstName?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      First name is required.
                    </PageText>
                  </Box>
                )}
                {errors?.firstName?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      First name cannot exceed 40 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>

              <FormControl id='last-name-control' isRequired>
                <FormLabel htmlFor='lastName'>
                  <PageText display='inline' fontSize='input'>
                    Last name
                  </PageText>
                </FormLabel>
                <Input
                  id='lastName'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  {...register('lastName', { required: true, maxLength: 80 })}
                />

                {errors?.lastName?.type === 'required' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Last name is required.
                    </PageText>
                  </Box>
                )}
                {errors?.lastName?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Last name cannot exceed 80 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Flex>

            {!errors?.firstName && !errors?.lastName && (
              <PageText as='small' fontSize='helpText' color='brand.helpText'>
                Who is the point of contact for the application?
              </PageText>
            )}
          </Flex>

          <FormControl id='email-control' isRequired mb={8}>
            <FormLabel htmlFor='email'>
              <PageText display='inline' fontSize='input'>
                Email
              </PageText>
            </FormLabel>
            <Input
              id='email'
              type='email'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              {...register('email', { required: true })}
            />

            {errors?.email?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Email is required.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='company-control' mb={8}>
            <FormLabel htmlFor='company' mb={1}>
              <PageText display='inline' fontSize='input'>
                Organization
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              If you are applying as an individual, leave blank
            </PageText>

            <Input
              id='company'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('company', {
                maxLength: 255
              })}
            />

            {errors?.company?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Organization name cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='applyingAs'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='applyingAs-control' isRequired mb={8}>
                <FormLabel htmlFor='applyingAs'>
                  <PageText display='inline' fontSize='input'>
                    Are you applying as an individual or a team?
                  </PageText>
                </FormLabel>

                <Box>
                  <Select
                    id='applyingAs'
                    options={SEMAPHORE_APPLYING_AS_OPTIONS}
                    onChange={(value: any) => {
                      onChange(value);
                      handleApplyingAs(value);
                    }}
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />

                  {error && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        Please select in which capacity you are applying.
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <Box display={(applyingAs as ApplyingAs).value === OTHER ? 'block' : 'none'}>
            <Fade in={(applyingAs as ApplyingAs).value === OTHER} delay={0.25}>
              <FormControl id='applyingAsOther-control' mb={8}>
                <FormLabel htmlFor='applyingAsOther'>
                  <PageText fontSize='input'>If other, please specify</PageText>
                </FormLabel>
                <Input
                  id='applyingAsOther'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('applyingAsOther', {
                    maxLength: 255
                  })}
                />

                {errors?.applyingAsOther?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Applying as info cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Controller
            name='country'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='country-control' mb={8} w={{ md: '50%' }} isRequired>
                <FormLabel htmlFor='country' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Where are you based?
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please indicate your country or the country where the team lead is located.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='country'
                    options={COUNTRY_OPTIONS}
                    onChange={onChange}
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />
                </Box>

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Country is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <FormControl id='countriesOfTeam-control' mb={8}>
            <FormLabel htmlFor='countriesOfTeam' mb={1}>
              <PageText display='inline' fontSize='input'>
                If you are a team of distributed members, please indicate where your fellow
                teammates are located.
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              You can write as many countries as needed.
            </PageText>

            <Input
              id='countriesOfTeam'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('countriesOfTeam', {
                maxLength: 255
              })}
            />

            {errors?.countriesOfTeam?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Countries list cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='timezone'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='timezone-control' isRequired mb={8}>
                <FormLabel htmlFor='timezone' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Time zone
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please choose your current time zone to help us schedule calls.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='timezone'
                    options={TIMEZONE_OPTIONS}
                    onChange={value => {
                      onChange(value);
                      trigger('timezone');
                    }}
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />
                </Box>

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Time zone is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <FormControl id='project-name-control' isRequired mb={8}>
            <FormLabel htmlFor='projectName' mb={1}>
              <PageText display='inline' fontSize='input'>
                Project name
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              This should be a concise description of the title of your project.
            </PageText>

            <Input
              id='projectName'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('projectName', {
                required: true,
                maxLength: 255
              })}
            />

            {errors?.projectName?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project name is required.
                </PageText>
              </Box>
            )}
            {errors?.projectName?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project name cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='project-description-control' isRequired mb={8}>
            <FormLabel htmlFor='projectDescription' mb={1}>
              <PageText display='inline' fontSize='input'>
                Brief Project Summary
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Describe your project in a few sentences (you&apos;ll have the chance to go into more
              detail in the long form). If it&apos;s already underway, provide links to any existing
              published work.
            </PageText>

            <Textarea
              id='projectDescription'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('projectDescription', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.projectDescription?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project description is required.
                </PageText>
              </Box>
            )}
            {errors?.projectDescription?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project description cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='projectCategory'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='project-category-control' isRequired mb={8}>
                <FormLabel htmlFor='projectCategory' mb={1}>
                  <PageText display='inline' fontSize='input'>
                    Project category
                  </PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please choose a category that your project best fits in.
                </PageText>

                <Box mt={3}>
                  <Select
                    id='projectCategory'
                    options={SEMAPHORE_GRANT_PROJECT_CATEGORY_OPTIONS}
                    onChange={onChange}
                    components={{ DropdownIndicator }}
                    placeholder='Select'
                    closeMenuOnSelect={true}
                    selectedOptionColor='brand.option'
                    chakraStyles={chakraStyles}
                  />

                  {error && (
                    <Box mt={1}>
                      <PageText as='small' fontSize='helpText' color='red.500'>
                        Project category is required.
                      </PageText>
                    </Box>
                  )}
                </Box>
              </FormControl>
            )}
          />

          <FormControl id='team-profile-control' isRequired mb={8}>
            <FormLabel htmlFor='teamProfile' mb={1}>
              <PageText display='inline' fontSize='input'>
                Team/ Individuals Description - A brief summary of you or your team&apos;s relevant
                experience
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Who is working on this project? Give us a bit of info and include relevant links, if
              available! Please provide other projects or research papers (ideally public and/or
              open source), engagements or other types of proof that your team has the necessary
              experience to undertake the project you are applying for.
            </PageText>

            <Textarea
              id='teamProfile'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('teamProfile', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.teamProfile?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team profile is required.
                </PageText>
              </Box>
            )}
            {errors?.teamProfile?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Team profile cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='project-previous-work-control' isRequired mb={8}>
            <FormLabel htmlFor='projectPreviousWork' mb={1}>
              <PageText display='inline' fontSize='input'>
                Relevant Past Projects
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Any links for us to review? E.g. repos, publications, blog posts, etc.
            </PageText>

            <Input
              id='projectPreviousWork'
              type='text'
              h='56px'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('projectPreviousWork', {
                required: true,
                maxLength: 255
              })}
            />

            {errors?.projectPreviousWork?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Previous work is required.
                </PageText>
              </Box>
            )}
            {errors?.projectPreviousWork?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Previous work cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='grantScope-control' isRequired mb={8}>
            <FormLabel htmlFor='grantScope' mb={1}>
              <PageText display='inline' fontSize='input'>
                Grant Scope
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What are your deliverables and what is outside of scope? What is the expected output?
            </PageText>

            <Textarea
              id='grantScope'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('grantScope', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.grantScope?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Grant scope is required.
                </PageText>
              </Box>
            )}
            {errors?.grantScope?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Grant scope cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='projectGoals-control' isRequired mb={8}>
            <FormLabel htmlFor='projectGoals' mb={1}>
              <PageText display='inline' fontSize='input'>
                Project goals &amp; success factors
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              What are you hoping to accomplish with this grant? How do you define and measure
              success for this project?
            </PageText>

            <Textarea
              id='projectGoals'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('projectGoals', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.projectGoals?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project impact is required.
                </PageText>
              </Box>
            )}
            {errors?.projectGoals?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project impact cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='problemBeingSolved-control' isRequired mb={8}>
            <FormLabel htmlFor='problemBeingSolved'>
              <PageText display='inline' fontSize='input'>
                What problem are you trying to solve?
              </PageText>
            </FormLabel>

            <Textarea
              id='problemBeingSolved'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              {...register('problemBeingSolved', {
                required: true,
                maxLength: 32768
              })}
            />

           

            {errors?.problemBeingSolved?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Problem being solved is required.
                </PageText>
              </Box>
            )}
            {errors?.problemBeingSolved?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Problem being solved cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='isYourProjectPublicGood-control' isRequired mb={8}>
            <FormLabel htmlFor='isYourProjectPublicGood'>
              <PageText display='inline' fontSize='input'>
                How does this project benefit the greater Ethereum ecosystem?
              </PageText>
            </FormLabel>

            <Textarea
              id='isYourProjectPublicGood'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              {...register('isYourProjectPublicGood', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.isYourProjectPublicGood?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Is your project public good is required.
                </PageText>
              </Box>
            )}
            {errors?.isYourProjectPublicGood?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Is your project public good cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='requested-amount-control' isRequired mb={8} w={{ md: '50%' }}>
            <FormLabel htmlFor='requestedAmount' mb={1}>
              <PageText display='inline' fontSize='input'>
                Total budget requested
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Estimated grant amount. Ex: USD 50,000.
            </PageText>

            <Input
              id='requestedAmount'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('requestedAmount', {
                required: true,
                maxLength: 20
              })}
            />

            {errors?.requestedAmount?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Requested amount is required.
                </PageText>
              </Box>
            )}
            {errors?.requestedAmount?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Requested amount cannot exceed 20 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='proposed-timeline-control' isRequired mb={8}>
            <FormLabel htmlFor='proposedTimeline' mb={1}>
              <PageText display='inline' fontSize='input'>
                Budget breakdown and project roadmap
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Please include a brief explanation on the milestones/roadmap in a 3-6 months
              timeframe, along with expected deliverables. Also outline how the funds will be used
              for the research project and/or members of the team.
            </PageText>

            <Textarea
              id='proposedTimeline'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('proposedTimeline', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.proposedTimeline?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project roadmap is required.
                </PageText>
              </Box>
            )}
            {errors?.proposedTimeline?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Project roadmap cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='challenges-control' isRequired mb={8}>
            <FormLabel htmlFor='challenges' mb={1}>
              <PageText display='inline' fontSize='input'>
                Challenges
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Have you come across any obstacles thus far? If so, how have you attempted to tackle
              these issues? Have you been successful in overcoming them?
            </PageText>

            <Textarea
              id='challenges'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('challenges', {
                required: true,
                maxLength: 32768
              })}
            />

            {errors?.challenges?.type === 'required' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Challenges description is required.
                </PageText>
              </Box>
            )}
            {errors?.challenges?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Challenges description cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='additionalSupportRequests-control' mb={8}>
            <FormLabel htmlFor='additionalSupportRequests' mb={1}>
              <PageText display='inline' fontSize='input'>
                Additional support requests
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Aside from funding and financial support, are there other resources that would help
              you or your team succeed?
            </PageText>

            <Textarea
              id='additionalSupportRequests'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('additionalSupportRequests', {
                maxLength: 32768
              })}
            />

            {errors?.additionalSupportRequests?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Additional support requests cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='howDidYouHearAboutESP'
            control={control}
            rules={{ required: true, validate: selected => selected.value !== '' }}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='how-did-you-hear-about-ESP-control' isRequired mb={12}>
                <FormLabel htmlFor='howDidYouHearAboutESP'>
                  <PageText display='inline' fontSize='input'>
                    How did you hear about this wave of grants?
                  </PageText>
                </FormLabel>

                <Select
                  id='howDidYouHearAboutESP'
                  options={HOW_DID_YOU_HEAR_ABOUT_GRANTS_WAVE}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                  onChange={(selected: any) => {
                    onChange(selected);
                    handleGrantsReferralSource(selected);
                  }}
                />

                {error && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Referral source is required.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Box
            display={
              (grantsReferralSource as GrantsReferralSource).value === OTHER ? 'block' : 'none'
            }
          >
            <Fade in={(grantsReferralSource as GrantsReferralSource).value === OTHER} delay={0.25}>
              <FormControl id='referral-source-if-other-control' mb={8}>
                <FormLabel htmlFor='referralSourceIfOther' mb={1}>
                  <PageText fontSize='input'>If other, explain how</PageText>
                </FormLabel>

                <PageText as='small' fontSize='helpText' color='brand.helpText'>
                  Please be as specific as possible (e.g. an email received, an individual who
                  recommended you apply, a link to a tweet, etc.).
                </PageText>

                <Input
                  id='referralSourceIfOther'
                  type='text'
                  bg='white'
                  borderRadius={0}
                  borderColor='brand.border'
                  h='56px'
                  _placeholder={{ fontSize: 'input' }}
                  color='brand.paragraph'
                  fontSize='input'
                  mt={3}
                  {...register('referralSourceIfOther', {
                    maxLength: 255
                  })}
                />

                {errors?.referralSourceIfOther?.type === 'maxLength' && (
                  <Box mt={1}>
                    <PageText as='small' fontSize='helpText' color='red.500'>
                      Referral source cannot exceed 255 characters.
                    </PageText>
                  </Box>
                )}
              </FormControl>
            </Fade>
          </Box>

          <Controller
            name='wouldYouShareYourResearch'
            control={control}
            defaultValue={{ value: '', label: '' }}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <FormControl id='wouldYouShareYourResearch-control' mb={8}>
                <FormLabel htmlFor='wouldYouShareYourResearch'>
                  <PageText display='inline' fontSize='input'>
                    If the opportunity presents itself, would you like to share your
                    findings/research output through a Conference/Discord talk?
                  </PageText>
                </FormLabel>

                <Select
                  id='wouldYouShareYourResearch'
                  options={WOULD_YOU_SHARE_YOUR_RESEARCH_OPTIONS}
                  onChange={onChange}
                  components={{ DropdownIndicator }}
                  placeholder='Select'
                  closeMenuOnSelect={true}
                  selectedOptionColor='brand.option'
                  chakraStyles={chakraStyles}
                />
              </FormControl>
            )}
          />

          <FormControl id='linkedinProfile-control' mb={8}>
            <FormLabel htmlFor='linkedinProfile' mb={1}>
              <PageText display='inline' fontSize='input'>
                LinkedIn Profile(s)
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              URL only.
            </PageText>

            <Input
              id='linkedinProfile'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('linkedinProfile', {
                maxLength: 255
              })}
            />

            {errors?.linkedinProfile?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  LinkedIn profiles cannot exceed 255 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='twitter-control' mb={8}>
            <FormLabel htmlFor='twitter' mb={1}>
              <PageText fontSize='input'>Twitter Handle(s)</PageText>
            </FormLabel>
            <PageText fontSize='input' position='absolute' bottom='15.5px' left={4} zIndex={9}>
              @
            </PageText>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Ex: @mytwitterhandle
            </PageText>

            <Input
              id='twitter'
              type='text'
              placeholder='yourtwitterhandle'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              position='relative'
              color='brand.paragraph'
              fontSize='input'
              pl={8}
              mt={3}
              {...register('twitter', {
                maxLength: 16
              })}
            />

            {errors?.twitter?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Twitter handle cannot exceed 16 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <FormControl id='telegram-control' mb={8}>
            <FormLabel htmlFor='telegram' mb={1}>
              <PageText display='inline' fontSize='input'>
                Telegram Username or Alternative Contact Info
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              In regards to your submission, we&apos;ll get in touch with you via email by default.
              As backup, if you&apos;d like to provide alternative contact info, you may do so. Not
              required.
            </PageText>

            <Input
              id='telegram'
              type='text'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              h='56px'
              _placeholder={{ fontSize: 'input' }}
              color='brand.paragraph'
              fontSize='input'
              mt={3}
              {...register('telegram', {
                maxLength: 150
              })}
            />

            {errors?.telegram?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Alternative contact info cannot exceed 150 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Controller
            name='repeatApplicant'
            control={control}
            rules={{ required: true }}
            defaultValue='No'
            render={({ field: { onChange, value } }) => (
              <FormControl id='repeat-applicant-control' isRequired mb={8}>
                <FormLabel htmlFor='repeatApplicant'>
                  <PageText display='inline' fontSize='input'>
                    Have you applied before to any grants at the Ethereum Foundation?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='repeatApplicant'
                  onChange={onChange}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='repeat-applicant-yes'
                      size='lg'
                      name='repeatApplicant'
                      value='Yes'
                      mr={8}
                    >
                      <PageText fontSize='input'>Yes</PageText>
                    </Radio>

                    <Radio
                      id='repeat-applicant-no'
                      size='lg'
                      name='repeatApplicant'
                      value='No'
                      defaultChecked
                    >
                      <PageText fontSize='input'>No</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <Controller
            name='canTheEFReachOut'
            control={control}
            defaultValue='Yes'
            render={({ field: { onChange, value } }) => (
              <FormControl id='canTheEFReachOut-control' mb={8}>
                <FormLabel htmlFor='canTheEFReachOut'>
                  <PageText display='inline' fontSize='input'>
                    Is it OK for a member of the Ethereum Foundation to reach out to you (say, in
                    regards to getting involved in other opportunities that may come up)?
                  </PageText>
                </FormLabel>

                <RadioGroup
                  id='canTheEFReachOut'
                  onChange={onChange}
                  value={value}
                  fontSize='input'
                  colorScheme='white'
                  mt={4}
                >
                  <Stack direction='row'>
                    <Radio
                      id='canTheEFReachOut-yes'
                      size='lg'
                      name='canTheEFReachOut'
                      value='Yes'
                      defaultChecked
                      mr={8}
                    >
                      <PageText fontSize='input'>Yes</PageText>
                    </Radio>

                    <Radio id='canTheEFReachOut-no' size='lg' name='canTheEFReachOut' value='No'>
                      <PageText fontSize='input'>No</PageText>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            )}
          />

          <FormControl id='additional-info-control' mb={8}>
            <FormLabel htmlFor='additionalInfo' mb={1}>
              <PageText fontSize='input'>
                Do you have any questions about this challenge, or is there anything else you&apos;d
                like to share?
              </PageText>
            </FormLabel>

            <PageText as='small' fontSize='helpText' color='brand.helpText'>
              Is there anything we didn&apos;t cover in the above questions? Feel free to add any
              relevant links here. This is optional.
            </PageText>

            <Textarea
              id='additionalInfo'
              bg='white'
              borderRadius={0}
              borderColor='brand.border'
              color='brand.paragraph'
              fontSize='input'
              h='150px'
              mt={3}
              {...register('additionalInfo', {
                maxLength: 32768
              })}
            />

            {errors?.additionalInfo?.type === 'maxLength' && (
              <Box mt={1}>
                <PageText as='small' fontSize='helpText' color='red.500'>
                  Additional info cannot exceed 32768 characters.
                </PageText>
              </Box>
            )}
          </FormControl>

          <Center mb={12}>
            <Captcha />
          </Center>

          <Center>
            <SubmitButton
              isValid={isValid}
              isSubmitting={isSubmitting}
              height='56px'
              width='310px'
              text='Submit Application'
            />
          </Center>
        </form>
      </FormProvider>
    </Stack>
  );
};
