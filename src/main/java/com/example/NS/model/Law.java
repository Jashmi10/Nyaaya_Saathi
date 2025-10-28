package com.example.NS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "laws")
public class Law {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String published_date;
    private String commencement_date;
    private String url;

    @Column(columnDefinition = "TEXT")
    private String embedding; // stored as JSON string

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getPublished_date() { return published_date; }
    public void setPublished_date(String published_date) { this.published_date = published_date; }

    public String getCommencement_date() { return commencement_date; }
    public void setCommencement_date(String commencement_date) { this.commencement_date = commencement_date; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getEmbedding() { return embedding; }
    public void setEmbedding(String embedding) { this.embedding = embedding; }
}
