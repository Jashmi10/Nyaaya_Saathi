package com.example.NS.repository;

import com.example.NS.model.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer, String> {

    // 🔍 Find lawyers whose address contains the given location
    @Query(value = "SELECT * FROM lawyers WHERE LOWER(advocate_address) LIKE LOWER(CONCAT('%', :location, '%'))", nativeQuery = true)
    List<Lawyer> findByAdvocateAddressContainingIgnoreCase(@Param("location") String location);
}
