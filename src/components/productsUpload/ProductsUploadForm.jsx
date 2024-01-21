export default function ProductsUploadForm({ handleFileChange, handleUpload }) {
  return <Grid py={6} px={24}>
    <Heading>Upload</Heading>
    <Grid py={4}>
      <Box>
        <FormControl>
          <FormLabel>File</FormLabel>
          <Input onChange={handleFileChange} type={"file"} />
        </FormControl>
        <Button mt={4} onClick={handleUpload}>
          Upload
        </Button>
      </Box>
    </Grid>
  </Grid>

}
