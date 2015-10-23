/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.IntelligenceDAO;
import entity.Area;
import entity.Excerpt;
import entity.Source;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import utility.ShieldUtility;

/**
 *
 * @author Franco
 */
public class UpdateSource extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet UpdateSource</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UpdateSource at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        ShieldUtility su = new ShieldUtility();
        
        HttpSession session = request.getSession();
        int editorID = (int)session.getAttribute("userID");
        
        int sourceID = Integer.parseInt(request.getParameter("sourceID"));
        int classID = Integer.parseInt(request.getParameter("sourceID"));
        String title = request.getParameter("text");
        String desc = request.getParameter("desc");
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String publishedStr = request.getParameter("published");
        Date published = null;
        try {
            published = format.parse(publishedStr);
        } catch (ParseException ex) {
            Logger.getLogger(SaveSource.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        Source src = new Source();
        
        src.setId(sourceID);
        src.setClassID(classID);
        src.setTitle(title);
        src.setDesc(desc);
        src.setPublished(published);
        
        IntelligenceDAO intlDAO = new IntelligenceDAO();
        String message = "An error occured";
        try{
            intlDAO.UpdateSource(editorID, src);
            message = "<strong>Excerpt</strong> has been <strong>updated.</strong>";
        }catch(Exception ex){
            System.out.println(ex);
        }
        
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(message);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
