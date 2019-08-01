package ir.online_exam.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ir.online_exam.domain.QuestionBank} entity.
 */
public class QuestionBankDTO implements Serializable {

    private Long id;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionBankDTO questionBankDTO = (QuestionBankDTO) o;
        if (questionBankDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionBankDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionBankDTO{" +
            "id=" + getId() +
            "}";
    }
}
