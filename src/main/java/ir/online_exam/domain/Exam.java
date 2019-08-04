package ir.online_exam.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Exam.
 */
@Entity
@Table(name = "exam")
public class Exam implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exam_title")
    private String examTitle;

    @Column(name = "details")
    private String details;

    @Column(name = "required_time")
    private String requiredTime;

    @Column(name = "total_mark")
    private Double totalMark;

    @Column(name = "max_total_mark")
    private Double maxTotalMark;

    @OneToMany(mappedBy = "exam")
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public Exam examTitle(String examTitle) {
        this.examTitle = examTitle;
        return this;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getDetails() {
        return details;
    }

    public Exam details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getRequiredTime() {
        return requiredTime;
    }

    public Exam requiredTime(String requiredTime) {
        this.requiredTime = requiredTime;
        return this;
    }

    public void setRequiredTime(String requiredTime) {
        this.requiredTime = requiredTime;
    }

    public Double getTotalMark() {
        return totalMark;
    }

    public Exam totalMark(Double totalMark) {
        this.totalMark = totalMark;
        return this;
    }

    public void setTotalMark(Double totalMark) {
        this.totalMark = totalMark;
    }

    public Double getMaxTotalMark() {
        return maxTotalMark;
    }

    public Exam maxTotalMark(Double maxTotalMark) {
        this.maxTotalMark = maxTotalMark;
        return this;
    }

    public void setMaxTotalMark(Double maxTotalMark) {
        this.maxTotalMark = maxTotalMark;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Exam questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Exam addQuestion(Question question) {
        this.questions.add(question);
        question.setExam(this);
        return this;
    }

    public Exam removeQuestion(Question question) {
        this.questions.remove(question);
        question.setExam(null);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Exam)) {
            return false;
        }
        return id != null && id.equals(((Exam) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Exam{" +
            "id=" + getId() +
            ", examTitle='" + getExamTitle() + "'" +
            ", details='" + getDetails() + "'" +
            ", requiredTime='" + getRequiredTime() + "'" +
            ", totalMark=" + getTotalMark() +
            ", maxTotalMark=" + getMaxTotalMark() +
            "}";
    }
}
