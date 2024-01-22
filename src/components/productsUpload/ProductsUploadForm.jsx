import { Box, Button, FormControl, FormLabel, Grid, Heading, Input } from "@chakra-ui/react";

import { useProductsUploadMutation } from '../../pages/ProductsUpload/useProductsUpload'
import { useState } from "react";

export default function ProductsUploadForm() {


  const [selectedFile, setSelectedFile] = useState(null);
  const handleProductFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const { uploadFile } = useProductsUploadMutation()

  function upload() {
    if (selectedFile)
      uploadFile(selectedFile)
  }

  return <Grid py={6} px={24}>
    <Heading>Upload</Heading>
    <Grid py={4}>
      <Box>
        <FormControl>
          <FormLabel>File</FormLabel>
          <Input onChange={handleProductFileChange} type={"file"} />
        </FormControl>
        <Button mt={4} onClick={upload}>
          Upload
        </Button>
      </Box>
    </Grid>
  </Grid>

}
