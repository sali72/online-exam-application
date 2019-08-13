package ir.online_exam.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import ir.online_exam.domain.enumeration.Gender;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "teacher_first_name")
    private String teacherFirstName;

    @Column(name = "teacher_last_name")
    private String teacherLastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "birth_date")
    private String birthDate;

    
    @Column(name = "teacher_code", unique = true)
    private String teacherCode;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeacherFirstName() {
        return teacherFirstName;
    }

    public Teacher teacherFirstName(String teacherFirstName) {
        this.teacherFirstName = teacherFirstName;
        return this;
    }

    public void setTeacherFirstName(String teacherFirstName) {
        this.teacherFirstName = teacherFirstName;
    }

    public String getTeacherLastName() {
        return teacherLastName;
    }

    public Teacher teacherLastName(String teacherLastName) {
        this.teacherLastName = teacherLastName;
        return this;
    }

    public void setTeacherLastName(String teacherLastName) {
        this.teacherLastName = teacherLastName;
    }

    public Gender getGender() {
        return gender;
    }

    public Teacher gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public Teacher birthDate(String birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getTeacherCode() {
        return teacherCode;
    }

    public Teacher teacherCode(String teacherCode) {
        this.teacherCode = teacherCode;
        return this;
    }

    public void setTeacherCode(String teacherCode) {
        this.teacherCode = teacherCode;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Teacher)) {
            return false;
        }
        return id != null && id.equals(((Teacher) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", teacherFirstName='" + getTeacherFirstName() + "'" +
            ", teacherLastName='" + getTeacherLastName() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", teacherCode='" + getTeacherCode() + "'" +
            "}";
    }
}
