package ir.online_exam.service.mapper;

import ir.online_exam.domain.*;
import ir.online_exam.service.dto.ExamDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Exam} and its DTO {@link ExamDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ExamMapper extends EntityMapper<ExamDTO, Exam> {


    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "removeCourse", ignore = true)
    @Mapping(target = "questions", ignore = true)
    @Mapping(target = "removeQuestion", ignore = true)
    Exam toEntity(ExamDTO examDTO);

    default Exam fromId(Long id) {
        if (id == null) {
            return null;
        }
        Exam exam = new Exam();
        exam.setId(id);
        return exam;
    }
}
