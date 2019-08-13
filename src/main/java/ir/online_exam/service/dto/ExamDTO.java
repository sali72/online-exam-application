package ir.online_exam.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ir.online_exam.domain.Exam} entity.
 */
public class ExamDTO implements Serializable {

    private Long id;

    private String examTitle;

    private String details;

    private String requiredTime;

    private Double totalMark;

    private Double maxTotalMark;


    private Long courseId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExamTitle() {
        return examTitle;
    }

    public void setExamTitle(String examTitle) {
        this.examTitle = examTitle;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getRequiredTime() {
        return requiredTime;
    }

    public void setRequiredTime(String requiredTime) {
        this.requiredTime = requiredTime;
    }

    public Double getTotalMark() {
        return totalMark;
    }

    public void setTotalMark(Double totalMark) {
        this.totalMark = totalMark;
    }

    public Double getMaxTotalMark() {
        return maxTotalMark;
    }

    public void setMaxTotalMark(Double maxTotalMark) {
        this.maxTotalMark = maxTotalMark;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExamDTO examDTO = (ExamDTO) o;
        if (examDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), examDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExamDTO{" +
            "id=" + getId() +
            ", examTitle='" + getExamTitle() + "'" +
            ", details='" + getDetails() + "'" +
            ", requiredTime='" + getRequiredTime() + "'" +
            ", totalMark=" + getTotalMark() +
            ", maxTotalMark=" + getMaxTotalMark() +
            ", course=" + getCourseId() +
            "}";
    }
}
