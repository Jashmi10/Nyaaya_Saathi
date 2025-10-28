package com.example.NS.repository;

import com.example.NS.model.Law;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LawRepository extends JpaRepository<Law, Long> {
    // We'll filter similarity in Service, no custom query needed
}
