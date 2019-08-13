package ir.online_exam.service.mapper;

import ir.online_exam.domain.*;
import ir.online_exam.service.dto.QuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Question} and its DTO {@link QuestionDTO}.
 */
@Mapper(componentModel = "spring", uses = {ExamMapper.class, QuestionBankMapper.class})
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {

    @Mapping(source = "exam.id", target = "examId")
    @Mapping(source = "questionBank.id", target = "questionBankId")
    QuestionDTO toDto(Question question);

    @Mapping(source = "examId", target = "exam")
    @Mapping(source = "questionBankId", target = "questionBank")
    Question toEntity(QuestionDTO questionDTO);

    default Question fromId(Long id) {
        if (id == null) {
            return null;
        }
        Question question = new Question();
        question.setId(id);
        return question;
    }
}
