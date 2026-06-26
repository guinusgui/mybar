package br.ufpi.mybar_spring.exceptions.custom;

public class EntidadeNaoEncontrada extends RuntimeException {
    
    public EntidadeNaoEncontrada(String message) {
        super(message);
    }

    public EntidadeNaoEncontrada(String message, Throwable e) {
        super(message, e);
    }
}
