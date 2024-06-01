const server = require("./api/server")

const HOST = "localhost:"
const PORT = 8000;

server.listen(PORT, () => console.log(`Server is Runing at ${HOST}${PORT}`));

// printf("Selam %d", a);