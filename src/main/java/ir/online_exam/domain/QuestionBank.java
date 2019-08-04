package ir.online_exam.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A QuestionBank.
 */
@Entity
@Table(name = "question_bank")
public class QuestionBank implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToOne
    @JoinColumn(unique = true)
    private Course course;

    @OneToMany(mappedBy = "questionBank")
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public QuestionBank title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Course getCourse() {
        return course;
    }

    public QuestionBank course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public QuestionBank questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public QuestionBank addQuestion(Question question) {
        this.questions.add(question);
        question.setQuestionBank(this);
        return this;
    }

    public QuestionBank removeQuestion(Question question) {
        this.questions.remove(question);
        question.setQuestionBank(null);
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
        if (!(o instanceof QuestionBank)) {
            return false;
        }
        return id != null && id.equals(((QuestionBank) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "QuestionBank{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
