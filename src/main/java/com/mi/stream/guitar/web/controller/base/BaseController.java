package com.mi.stream.guitar.web.controller.base;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * base controller
 *
 * @author mi zxq
 * @date 2019/10/28 9:51
 */
public abstract class BaseController<T> {
    
    @Resource
    protected HttpServletRequest request;
    
    @Resource
    protected HttpServletResponse response;
    
}
