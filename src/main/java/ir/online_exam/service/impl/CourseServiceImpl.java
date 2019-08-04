package ir.online_exam.service.impl;

import ir.online_exam.service.CourseService;
import ir.online_exam.domain.Course;
import ir.online_exam.repository.CourseRepository;
import ir.online_exam.service.dto.CourseDTO;
import ir.online_exam.service.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Course}.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

    private final CourseRepository courseRepository;

    private final CourseMapper courseMapper;

    public CourseServiceImpl(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    /**
     * Save a course.
     *
     * @param courseDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        log.debug("Request to save Course : {}", courseDTO);
        Course course = courseMapper.toEntity(courseDTO);
        course = courseRepository.save(course);
        return courseMapper.toDto(course);
    }

    /**
     * Get all the courses.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CourseDTO> findAll() {
        log.debug("Request to get all Courses");
        return courseRepository.findAllWithEagerRelationships().stream()
            .map(courseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the courses with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<CourseDTO> findAllWithEagerRelationships(Pageable pageable) {
        return courseRepository.findAllWithEagerRelationships(pageable).map(courseMapper::toDto);
    }
    

    /**
     * Get one course by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CourseDTO> findOne(Long id) {
        log.debug("Request to get Course : {}", id);
        return courseRepository.findOneWithEagerRelationships(id)
            .map(courseMapper::toDto);
    }

    /**
     * Delete the course by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Course : {}", id);
        courseRepository.deleteById(id);
    }
}
