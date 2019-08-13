package ir.online_exam.service.mapper;

import ir.online_exam.domain.*;
import ir.online_exam.service.dto.ExamDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Exam} and its DTO {@link ExamDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class})
public interface ExamMapper extends EntityMapper<ExamDTO, Exam> {

    @Mapping(source = "course.id", target = "courseId")
    ExamDTO toDto(Exam exam);

    @Mapping(source = "courseId", target = "course")
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
