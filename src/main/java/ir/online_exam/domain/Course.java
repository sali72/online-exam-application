package ir.online_exam.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "course_title")
    private String courseTitle;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @OneToOne
    @JoinColumn(unique = true)
    private QuestionBank questionBank;

    @OneToMany(mappedBy = "course")
    private Set<Exam> exams = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("courses")
    private Teacher teacher;

    @ManyToMany
    @JoinTable(name = "course_student",
               joinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"))
    private Set<Student> students = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public Course courseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
        return this;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getStartDate() {
        return startDate;
    }

    public Course startDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public Course endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public QuestionBank getQuestionBank() {
        return questionBank;
    }

    public Course questionBank(QuestionBank questionBank) {
        this.questionBank = questionBank;
        return this;
    }

    public void setQuestionBank(QuestionBank questionBank) {
        this.questionBank = questionBank;
    }

    public Set<Exam> getExams() {
        return exams;
    }

    public Course exams(Set<Exam> exams) {
        this.exams = exams;
        return this;
    }

    public Course addExam(Exam exam) {
        this.exams.add(exam);
        exam.setCourse(this);
        return this;
    }

    public Course removeExam(Exam exam) {
        this.exams.remove(exam);
        exam.setCourse(null);
        return this;
    }

    public void setExams(Set<Exam> exams) {
        this.exams = exams;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Course teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Course students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Course addStudent(Student student) {
        this.students.add(student);
        student.getCourses().add(this);
        return this;
    }

    public Course removeStudent(Student student) {
        this.students.remove(student);
        student.getCourses().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", courseTitle='" + getCourseTitle() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
