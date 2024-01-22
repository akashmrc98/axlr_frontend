
import { Box, FormControl, FormLabel, Grid, Stack } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link
} from '@chakra-ui/react'
import { useProductStore } from '../../pages/Products/useProductStore'

export default function ProductsCategoryComponent() {

  const { filters, setFilters } = useProductStore((state) => state)
  function setCategory(e) {
    setFilters({
      ...filters,
      category: e
    })
  }

  return <Stack>

    <FormControl>

      <FormLabel>Category</FormLabel>
      {categories.map((category, index) =>
        <Accordion allowToggle={true} allowMultiple={false} key={index}>
          <AccordionItem>
            <h2>
              <AccordionButton onClick={
                () => {
                  if (category.title === "All") {
                    setCategory("")
                  }
                }

              } bg={filters.category === category.title ? "gray.100" : 'none'} >
                <Box as="span" flex='1' textAlign='left'>
                  {category.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {category.options.map((option, i) =>
              <AccordionPanel
                bg={option === filters.category ? 'gray.100' : 'transparent'}
                key={i} pb={4}>
                <Grid justifyContent={"flex-start"}>
                  <Link onClick={() => setCategory(option)} key={i} variant="link">{option}</Link>
                </Grid>

              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      )}
    </FormControl>
  </Stack>

}

const categories = [
  { title: `All`, options: [] },
  {

    title: `Audio & Video`,
    options: [
      `TV`,
      `Monitor`,
      `Headphones`,
      `Headset`,
    ]
  },
  {
    title: `Computers`,
    options: [
      `Laptop`,
      `Gaming`,
      `Games`,
      `Accessories`,
      `Computer Peripherals`,
      `Software`
    ]
  },
  {
    title: `Home`,
    options: [
      `Bed Linen & Blankets`,
      `Curtains & Accessories`,
      `Bath Linen`,
      `Floor Coverings`,
      `Cushions & Pillows`,
    ]
  },
  {
    title: `Topwear`,
    options: [
      `Shirts`,
      `T-shirts`,
    ]
  },
]
