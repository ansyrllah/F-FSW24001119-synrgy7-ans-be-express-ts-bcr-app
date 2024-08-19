import app from "./route";

const port: number = Number(process.env.APP_PORT) || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
