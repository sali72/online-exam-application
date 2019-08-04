package ir.online_exam.web.rest;

import ir.online_exam.service.StudentService;
import ir.online_exam.web.rest.errors.BadRequestAlertException;
import ir.online_exam.service.dto.StudentDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ir.online_exam.domain.Student}.
 */
@RestController
@RequestMapping("/api")
public class StudentResource {

    private final Logger log = LoggerFactory.getLogger(StudentResource.class);

    private static final String ENTITY_NAME = "student";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentService studentService;

    public StudentResource(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * {@code POST  /students} : Create a new student.
     *
     * @param studentDTO the studentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentDTO, or with status {@code 400 (Bad Request)} if the student has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/students")
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO studentDTO) throws URISyntaxException {
        log.debug("REST request to save Student : {}", studentDTO);
        if (studentDTO.getId() != null) {
            throw new BadRequestAlertException("A new student cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentDTO result = studentService.save(studentDTO);
        return ResponseEntity.created(new URI("/api/students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /students} : Updates an existing student.
     *
     * @param studentDTO the studentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentDTO,
     * or with status {@code 400 (Bad Request)} if the studentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/students")
    public ResponseEntity<StudentDTO> updateStudent(@Valid @RequestBody StudentDTO studentDTO) throws URISyntaxException {
        log.debug("REST request to update Student : {}", studentDTO);
        if (studentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentDTO result = studentService.save(studentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, studentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /students} : get all the students.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of students in body.
     */
    @GetMapping("/students")
    public List<StudentDTO> getAllStudents(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Students");
        return studentService.findAll();
    }

    /**
     * {@code GET  /students/:id} : get the "id" student.
     *
     * @param id the id of the studentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/students/{id}")
    public ResponseEntity<StudentDTO> getStudent(@PathVariable Long id) {
        log.debug("REST request to get Student : {}", id);
        Optional<StudentDTO> studentDTO = studentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentDTO);
    }

    /**
     * {@code DELETE  /students/:id} : delete the "id" student.
     *
     * @param id the id of the studentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        log.debug("REST request to delete Student : {}", id);
        studentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
