package br.ufpi.mybar_spring.exceptions.handler;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.ufpi.mybar_spring.dto.dto.erro.ErroDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntidadeNaoEncontrada.class)
    public ResponseEntity<ErroDto> handleEntidadeNaoEncontrada(
        EntidadeNaoEncontrada ex,
        HttpServletRequest request
    ) {
        
        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            HttpStatus.NOT_FOUND.getReasonPhrase(),
            ex.getMessage(),
            request.getRequestURI()
        );

        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(erro);
    }

    @ExceptionHandler(RequisicaoIlegal.class)
    public ResponseEntity<ErroDto> handleRequisicaoIlegal(
        RequisicaoIlegal ex,
        HttpServletRequest request
    ) {
        
        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            ex.getMessage(),
            request.getRequestURI()
        );

        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(erro);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroDto> handleValidation(
        MethodArgumentNotValidException  ex,
        HttpServletRequest request
    ){
        String errorMessage = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> 
                error.getField() +": " + error.getDefaultMessage()
            )
            .findFirst()
            .orElse("Erro de Validação");

        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            errorMessage,
            request.getRequestURI()
        );

        return ResponseEntity
            .badRequest()
            .body(erro);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErroDto> handleValidation(
        ConstraintViolationException  ex,
        HttpServletRequest request
    ){
        String errorMessage = ex.getConstraintViolations()
            .stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.joining("; "));

        ErroDto erro = new ErroDto(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            errorMessage,
            request.getRequestURI()
        );

        return ResponseEntity
            .badRequest()
            .body(erro);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErroDto> handleHttpMessageNotReadable(
        HttpMessageNotReadableException ex,
        HttpServletRequest request) {

    ErroDto error = new ErroDto(
        LocalDateTime.now(),
        HttpStatus.BAD_REQUEST.value(),
        HttpStatus.BAD_REQUEST.getReasonPhrase(),
        "Corpo da requisição inválido ou mal formatado",
        request.getRequestURI()
    );

    return ResponseEntity.badRequest().body(error);
}


}
