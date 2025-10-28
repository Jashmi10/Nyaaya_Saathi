package com.example.NS.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lawyers")
public class Lawyer {

    @Id
    @Column(name = "advocate_id")
    private String advocateId;

    @Column(name = "advocate_name")
    private String advocateName;

    @Column(name = "advocate_address")
    private String advocateAddress;

    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "date_of_enrollment")
    private String dateOfEnrollment;

    // ✅ Constructors
    public Lawyer() {}

    public Lawyer(String advocateId, String advocateName, String advocateAddress, String dateOfBirth, String dateOfEnrollment) {
        this.advocateId = advocateId;
        this.advocateName = advocateName;
        this.advocateAddress = advocateAddress;
        this.dateOfBirth = dateOfBirth;
        this.dateOfEnrollment = dateOfEnrollment;
    }

    // ✅ Getters and Setters
    public String getAdvocateId() { return advocateId; }
    public void setAdvocateId(String advocateId) { this.advocateId = advocateId; }

    public String getAdvocateName() { return advocateName; }
    public void setAdvocateName(String advocateName) { this.advocateName = advocateName; }

    public String getAdvocateAddress() { return advocateAddress; }
    public void setAdvocateAddress(String advocateAddress) { this.advocateAddress = advocateAddress; }

    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getDateOfEnrollment() { return dateOfEnrollment; }
    public void setDateOfEnrollment(String dateOfEnrollment) { this.dateOfEnrollment = dateOfEnrollment; }
}
