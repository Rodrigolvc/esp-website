import { Accordion, Box, Flex, Link, ListItem, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { NextPage } from 'next';

import {
  ApplicantsSidebar,
  FAQItem,
  List,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata,
  BannerApplicationClosed
} from '../../components/UI';

import {
  ACADEMIC_GRANTS_EMAIL_ADDRESS,
  HOME_URL,
  SIDEBAR_ACADEMIC_GRANTS_LINKS,
  WHO_WE_SUPPORT_URL
} from '../../constants';

const AcademicGrants: NextPage = () => {
  // `threshold` option allows us to control the % of visibility required before triggering the Intersection Observer
  // https://react-intersection-observer.vercel.app/?path=/story/introduction--page#options
  const [ref, inView] = useInView({ threshold: 0 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });
  const [ref3, inView3] = useInView({ threshold: 0.5, initialInView: false });
  const [ref4, inView4] = useInView({ threshold: 0.5, initialInView: false });
  const [ref5, inView5] = useInView({ threshold: 0.3, initialInView: false });
  const [ref6, inView6] = useInView({ threshold: 0.5, initialInView: false });
  const [ref7, inView7] = useInView({ threshold: 0.5, initialInView: false });
  const [ref8, inView8] = useInView({ threshold: 0.5, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Academic Grants Round'
        description='The Ethereum Foundation is sponsoring a wave of grants to support Ethereum-related academic work. Find all the details you need to apply here.'
      />

      <Box mx={{ md: 12 }} bg='white' position='relative' zIndex={1} mt={{ xl: 12 }}>
        <Stack spacing={10} mb={8} px={{ base: 5, md: 0 }} py={{ base: 3, md: 12 }}>
          <Flex>
            <ApplicantsSidebar
              sidebarLinks={SIDEBAR_ACADEMIC_GRANTS_LINKS}
              sectionsInView={[
                inView,
                inView2,
                inView3,
                inView4,
                inView5,
                inView6,
                inView7,
                inView8
              ]}
            />

            <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
              <BannerApplicationClosed mb={12} />

              <Stack mb={8} mt={{ base: 10, md: 0 }}>
                <section id='description' ref={ref}>
                  <PageSubheading mb={8}>
                    We&apos;re calling all those interested in expanding academic knowledge
                    throughout the Ethereum ecosystem!
                  </PageSubheading>

                  <PageText mb={6}>
                    The Ethereum community has grown immensely as developers, artists, companies,
                    and even governments work together to make a positive impact with this
                    technology.
                  </PageText>

                  <PageText mb={6}>
                    With this grants round, the Ethereum Foundation welcomes more academics to the
                    table to push forward formal academic research in related domains. Such domains
                    include theoretical and applied cryptography and mathematics, zero-knowledge
                    proofs, economics, computation, cybersecurity, protocol and consensus
                    mechanisms, formal verification, P2P networking, and hardware, just to mention a
                    few areas.
                  </PageText>

                  <PageText>
                    The Ethereum Foundation is excited to expand Ethereum&apos;s reach across more
                    of academia through this grants round.
                  </PageText>
                </section>
              </Stack>

              <Stack spacing={10}>
                <section id='submit-proposal' ref={ref2}>
                  <PageSection mb={6}>Submit proposal</PageSection>

                  <PageText mb={6}>
                    Individual researchers with academic backgrounds, research centers,
                    universities, think-tanks, educators and other stakeholders interested in
                    research on matters related to Ethereum and its ecosystem are encouraged to
                    apply.
                  </PageText>

                  <PageText mb={6}>
                    Anyone is free to participate in this grants round, as an individual or with a
                    team.
                  </PageText>

                  <PageText mb={6}>
                    Research outputs are encouraged but not limited to the following{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@djrtwo/academic-grants-2022'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist
                    </Link>
                    .
                  </PageText>

                  <PageText mb={6}>
                    We welcome research at any stage, whether it&apos;s a new idea based on the
                    wishlist, a project that furthers Ethereum-related research you&apos;ve already
                    undertaken, or a lab experiment.
                  </PageText>

                  <PageText mb={6}>
                    Grants will be awarded on a case-by-case and rolling basis. You may enter more
                    than one proposal as long as each proposal is unique and meets the{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='#requirements'
                      _hover={{ textDecoration: 'none' }}
                    >
                      the requirements
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='deadline' ref={ref3}>
                  <PageSection mb={6}>Deadline</PageSection>

                  <PageText mb={6}>
                    The deadline has been extended. Submit by <strong>May 8, 2022</strong>. We will
                    follow-up regarding your submission by email.
                  </PageText>
                </section>

                <section id='requirements' ref={ref4}>
                  <PageSection mb={6}>Requirements</PageSection>

                  <List>
                    <ListItem>Proposals must be in English.</ListItem>
                    <ListItem>Work must be open source.</ListItem>
                    <ListItem>Reports must be accessible by a url.</ListItem>
                  </List>
                </section>

                <section id='selection-criteria' ref={ref5}>
                  <PageSection mb={6}>Selection criteria</PageSection>

                  <PageText mb={6}>
                    <strong>Surprise us with your creativity!</strong> But here are a few selection
                    criteria considerations:
                  </PageText>

                  <List>
                    <ListItem>Impact of the proposed research output.</ListItem>
                    <ListItem>Quality of work and experience of the research team.</ListItem>
                    <ListItem>Clarity, conciseness and organization of the proposal.</ListItem>
                    <ListItem>Contribution to the wishlist areas.</ListItem>
                    <ListItem>
                      Potential of long-term involvement in the Ethereum ecosystem.
                    </ListItem>
                    <ListItem>
                      Analyses or visualizations that help a non-technical audience gain insight
                      into the research.
                    </ListItem>
                  </List>
                </section>

                <section id='wishlist' ref={ref6}>
                  <PageSection mb={6}>Wishlist</PageSection>

                  <PageText mb={6}>
                    The Ethereum Foundation is interested in research and academic output in the
                    following domain areas, but don&apos;t let this restrict your creativity. Check
                    out our{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href='https://notes.ethereum.org/@djrtwo/academic-grants-2022'
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      wishlist
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='next-steps-and-support' ref={ref7}>
                  <PageSection mb={6}>Next steps and support</PageSection>

                  <PageText mb={6}>
                    For any general support questions about your submission, please email{' '}
                    <Link
                      fontWeight={700}
                      color='brand.orange.100'
                      href={`mailto:${ACADEMIC_GRANTS_EMAIL_ADDRESS}`}
                      isExternal
                      _hover={{ textDecoration: 'none' }}
                    >
                      {ACADEMIC_GRANTS_EMAIL_ADDRESS}
                    </Link>
                    .
                  </PageText>
                </section>

                <section id='faq' ref={ref8}>
                  <PageSection mb={6}>Frequently asked questions</PageSection>

                  <Accordion allowToggle>
                    <FAQItem question='Who can submit proposals for Academic Grants Round?'>
                      <PageText>
                        Academic institutions, consortia of universities, research centres,
                        universities, think-tanks and individuals with prior research experience.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What makes for a good proposal?'>
                      <PageText>
                        In short, we need enough information to understand your goals, the research
                        problem you&apos;re aiming to tackle, the academic output, information on
                        previous research work, who&apos;s involved and estimation regarding time
                        and budget. The more details you provide, the more likely we&apos;ll be able
                        to help.
                      </PageText>

                      <Box>
                        <PageText>For example:</PageText>
                        <List>
                          <ListItem>
                            Clearly showing the research area you&apos;re digging into.
                          </ListItem>
                          <ListItem>
                            Outlining the output. Is it a research paper or lab work that will
                            culminate in an experimental report?
                          </ListItem>
                          <ListItem>
                            Clearly stating the impact your research will have and how you foresee
                            your findings being used by the Ethereum community.
                          </ListItem>
                          <ListItem>
                            Detailed description of your project, milestones, the people involved
                            and how much time you think it will take to complete.
                          </ListItem>
                        </List>
                      </Box>
                    </FAQItem>

                    <FAQItem question='What stage does my idea or project need to be in?'>
                      <PageText>
                        If you have a follow-up idea of a previous research you conducted or if your
                        research is aligned with the wishlist domains, we want to hear about it! The
                        goal is to advance knowledge that pushes the Ethereum ecosystem forward.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What should the output be?'>
                      <PageText>
                        We are aiming to receive academic and formal research outputs, be it a
                        research paper, an experimental report or some sort of comprehensive
                        research output. Whatever the output, the information should be open-source
                        and available for the broader community to use. The Intellectual Property
                        can still be owned by the research team, but it is key that the output is
                        open source.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What is the budget available for this round?'>
                      <PageText>
                        This grants round has up to $750,000 in total, which is to be distributed
                        among selected projects.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What is the expected duration of the research project?'>
                      <PageText>
                        We envision projects to take between 6 to 12 months, however, we are open to
                        some flexibility depending on the project proposal.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Are applications evaluated on a rolling basis or at the end of the deadline?'>
                      <PageText>
                        Project submissions will be evaluated on a rolling basis and contact will be
                        made with each applicant to inform about the evaluation outcome.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What costs are eligible for the Academic Grants Round?'>
                      <PageText>
                        Costs related to academic research are eligible for the Academic Grants
                        Round. We encourage you to itemize each cost on the budget section of the
                        submission form.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Is there any co-financing needed?'>
                      <PageText>
                        No, the Ethereum Foundation does not require co-financing. Grants will be
                        100% covered by the Ethereum Foundation.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What is the average grant size?'>
                      <PageText>
                        As projects may vary largely in duration, scope and outputs, grant amounts
                        may also differ to a large extent. We suggest that you present a budget that
                        covers your academic research and related outputs, itemizing each of the
                        costs.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Is the grant awarded in FIAT or in Crypto?'>
                      <PageText>
                        You may choose if you prefer receiving the grant in FIAT, ETH or DAI, but
                        for the purposes of the project proposal and submission form, we kindly ask
                        you to indicate the requested amount in FIAT.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Is there guidance on how long projects should last?'>
                      <PageText>
                        Projects may vary in duration. We are estimating projects to last between
                        6-12 months, but it is an indicative timeframe. We allow for some
                        flexibility as projects may vary largely in domain, scope, outputs and
                        researchers involved.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Are only applications that address the wishlist considered for funding?'>
                      <PageText>
                        Ethereum-related research will be supported through the Academic Grants
                        Rounds. Your proposal does not need to be addressing one of the wishlist
                        areas. The wishlist should be seen as guidance on the most pressing issues
                        we have identified but is not exhaustive.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Can I submit more than one application or should I combine all the project ideas into one sole application?'>
                      <PageText>
                        You should submit one application per project idea/ wishlist area. Multiple
                        applications per institution are accepted for the Academic Grants Round.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Has this type of grant been awarded before by the Ethereum Foundation?'>
                      <PageText>
                        It is the first time the Ethereum Foundation is launching a specific grants
                        round to support Ethereum-related academic research. However, we do have an
                        ongoing support Program - the Ecosystem Support Program - which supports
                        Ethereum related projects in various scopes.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Can you provide an estimate on the number of project submissions and selected projects in previous Academic Grants rounds?'>
                      <PageText>
                        This is the first round of grants administered by the Ethereum Foundation
                        that specifically supports academic research. However, the Ethereum
                        Foundation has an ongoing support program - the Ecosystem Support Program -
                        and you’ll be able to find some of the granted projects{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={WHO_WE_SUPPORT_URL}
                          _hover={{ textDecoration: 'none' }}
                        >
                          here
                        </Link>
                        .
                      </PageText>
                    </FAQItem>

                    <FAQItem question='Are Master students eligible to apply for the Academic Grants Round or is PhD level required?'>
                      <PageText>
                        Master&apos;s Students are eligible to apply for the grants round, should
                        they have the academic support of supervisors. PhD level is not required.
                      </PageText>
                    </FAQItem>

                    <FAQItem question='What if I miss the deadline?'>
                      <PageText>
                        We encourage you to submit an inquiry for support through the Ecosystem
                        Support Program.
                      </PageText>

                      <PageText>
                        The Ethereum Foundation has a general grants initiative called the{' '}
                        <Link
                          fontWeight={700}
                          color='brand.orange.100'
                          href={HOME_URL}
                          _hover={{ textDecoration: 'none' }}
                        >
                          Ecosystem Support Program (ESP)
                        </Link>
                        .
                      </PageText>

                      <PageText>
                        If you miss the deadline for this dedicated round of grants, but have a
                        proposal that advances the Ethereum ecosystem, we encourage you to head over
                        to ESP.
                      </PageText>
                    </FAQItem>
                  </Accordion>
                </section>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default AcademicGrants;
