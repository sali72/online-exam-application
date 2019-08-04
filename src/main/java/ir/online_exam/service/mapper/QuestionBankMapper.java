package ir.online_exam.service.mapper;

import ir.online_exam.domain.*;
import ir.online_exam.service.dto.QuestionBankDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link QuestionBank} and its DTO {@link QuestionBankDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class})
public interface QuestionBankMapper extends EntityMapper<QuestionBankDTO, QuestionBank> {

    @Mapping(source = "course.id", target = "courseId")
    QuestionBankDTO toDto(QuestionBank questionBank);

    @Mapping(source = "courseId", target = "course")
    @Mapping(target = "questions", ignore = true)
    @Mapping(target = "removeQuestion", ignore = true)
    QuestionBank toEntity(QuestionBankDTO questionBankDTO);

    default QuestionBank fromId(Long id) {
        if (id == null) {
            return null;
        }
        QuestionBank questionBank = new QuestionBank();
        questionBank.setId(id);
        return questionBank;
    }
}
