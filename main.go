package main


import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
)
var port = flag.String("port", "8080", "http server port")
var addr = flag.String("server", "localhost", "http server address")

func main() {
	flag.Parse()
	hub := newHub()
	go hub.run()

	mux := http.NewServeMux()
	mux.HandleFunc("/", serveStatic)
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	address := fmt.Sprintf("%s:%s", *addr, *port)
	fmt.Printf("Server started on port %s\n", address)
	if err := http.ListenAndServe(":8080", handlers.CombinedLoggingHandler(os.Stdout, mux)); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func serveStatic(w http.ResponseWriter, r *http.Request) {
	// Otherwise, just serve the requested file
	http.ServeFile(w, r, "index.html")
}
