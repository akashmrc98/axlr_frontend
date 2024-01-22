
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
              <AccordionButton >
                <Box as="span" flex='1' textAlign='left'>
                  {category.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid justifyContent={"flex-start"}>
                {category.options.map((option, i) =>
                  <Link onClick={() => setCategory(option)} key={i} variant="link">{option}</Link>)
                }
              </Grid>

            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </FormControl>
  </Stack>

}

const categories = [
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
      `Laptops`,
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
