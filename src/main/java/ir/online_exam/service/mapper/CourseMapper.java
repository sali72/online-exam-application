package ir.online_exam.service.mapper;

import ir.online_exam.domain.*;
import ir.online_exam.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Course} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring", uses = {QuestionBankMapper.class, TeacherMapper.class, StudentMapper.class})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {

    @Mapping(source = "questionBank.id", target = "questionBankId")
    @Mapping(source = "teacher.id", target = "teacherId")
    CourseDTO toDto(Course course);

    @Mapping(source = "questionBankId", target = "questionBank")
    @Mapping(target = "exams", ignore = true)
    @Mapping(target = "removeExam", ignore = true)
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(target = "removeStudent", ignore = true)
    Course toEntity(CourseDTO courseDTO);

    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
