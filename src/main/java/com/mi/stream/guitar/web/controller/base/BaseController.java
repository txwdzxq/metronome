package com.mi.stream.guitar.web.controller.base;

import javax.servlet.http.HttpServletRequest;

/**
 * @author mi zxq
 * @date 2019/10/28 9:51
 */
public abstract class BaseController<T> {
    
    HttpServletRequest request;
    HttpServletRequest response;
    
    public BaseController(HttpServletRequest request, HttpServletRequest response) {
        this.request = request;
        this.response = response;
    }
    
    
    
    
}
