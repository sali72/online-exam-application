package ir.online_exam.service.mapper;

import ir.online_exam.domain.*;
import ir.online_exam.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Course} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, QuestionBankMapper.class, ExamMapper.class, StudentMapper.class})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {

    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "questionBank.id", target = "questionBankId")
    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "exam.id", target = "examId")
    @Mapping(source = "exam.id", target = "examId")
    CourseDTO toDto(Course course);

    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(source = "questionBankId", target = "questionBank")
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(source = "examId", target = "exam")
    @Mapping(target = "removeStudent", ignore = true)
    @Mapping(target = "students", ignore = true)
    @Mapping(target = "removeStudent", ignore = true)
    @Mapping(source = "examId", target = "exam")
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
