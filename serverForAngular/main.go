package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Responce struct {
	Data []Data `json:"data"`
}

type Data struct {
	ID         string     `json:"id"`
	Attributes Attributes `json:"attributes"`
}

type Attributes struct {
	StartDate      string `json:"startDate"`
	EndDate        string `json:"endDate"`
	Description    string `json:"description"`
	CanonicalTitle string `json:"canonicalTitle"`
	AverageRating  string `json:"averageRating"`
}

type Output struct {
	ID             string `json:"id"`
	StartDate      string `json:"startDate"`
	EndDate        string `json:"endDate"`
	Description    string `json:"description"`
	CanonicalTitle string `json:"title"`
	AverageRating  string `json:"rating"`
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/api/series", getSeriesList).Methods("GET")
	r.HandleFunc("/api/series/{id}", getSeries).Methods("GET")
	fmt.Println("Server is running")
	log.Fatal(http.ListenAndServe(":8000", r))
}

func getSeriesList(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	resp, err := http.Get("https://kitsu.io/api/edge/anime?filter[text]=" + name)
	if err != nil {
		log.Fatalln(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)
	var result Responce
	var out []Output
	err = json.Unmarshal(body, &result)
	for _, el := range result.Data {
		a := Output{
			ID:             el.ID,
			AverageRating:  el.Attributes.AverageRating,
			CanonicalTitle: el.Attributes.CanonicalTitle,
			StartDate:      el.Attributes.StartDate,
			EndDate:        el.Attributes.EndDate,
			Description:    el.Attributes.Description,
		}
		out = append(out, a)
	}
	if err != nil {
		log.Fatal("Unmarshal failed", err)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(out)
}

func getSeries(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("https://kitsu.io/api/edge/anime?filter[id]=" + mux.Vars(r)["id"])
	if err != nil {
		log.Fatalln(err)
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			panic(err)
		}
	}(resp.Body)
	var result Responce
	var out []Output
	err = json.Unmarshal(body, &result)
	for _, el := range result.Data {
		a := Output{
			ID:             el.ID,
			AverageRating:  el.Attributes.AverageRating,
			CanonicalTitle: el.Attributes.CanonicalTitle,
			StartDate:      el.Attributes.StartDate,
			EndDate:        el.Attributes.EndDate,
			Description:    el.Attributes.Description,
		}
		out = append(out, a)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(out)
}
